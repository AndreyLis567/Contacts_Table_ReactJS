import React, { useCallback, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useContacts } from './useContacts'
import { Typography } from '@material-ui/core';
import { ContactsTable } from './table';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import { ContactsFilters } from './../pages/contactsFilters'


const useStyles = makeStyles((theme) =>
   createStyles({
      root: {
         marginTop: theme.spacing(4),
      },
      headContainer: {
         marginBottom: theme.spacing(3),
      },
      filtersContainer: {
         marginBottom: theme.spacing(3)
      }
   })
);
const FilterDefaultValue = {
   fullname: "",
   gender: "all",
   nationality: "all"
}

const filterByFullname = ({ first, last }, fullname) =>
   first?.toLowerCase().includes(fullname.toLowerCase()) ||
   last?.toLowerCase().includes(fullname.toLowerCase());

const filterByGender = (value, gender) => {
   if (gender === 'all') {
      return true
   }
   return value === gender
}

const filterByNationality = (value, nationality) => {
   if (nationality === 'all') {
      return true
   }
   return value === nationality
}


export const Contacts = () => {
   const classes = useStyles();
   const contacts = useContacts();
   const [filters, setFilters] = useState(FilterDefaultValue);
   const [directionSort, setDirectionSort] = useState(true)

   const updateFilter = useCallback((name, value) => {
      setFilters((prevFilters) => ({
         ...prevFilters,
         [name]: value
      }))
   }, []);

   const clearFilters = useCallback(() => {
      setFilters(FilterDefaultValue)
   }, []);

   const filteredContacts = contacts.data.concat()
      .filter(c => filterByFullname(c.name, filters.fullname))
      .filter(c => filterByGender(c.gender, filters.gender))
      .filter(c => filterByNationality(c.nat, filters.nationality));
   
      const sortData = (field) => {
         const copyData = contacts.data.concat();
         let sortData;
         if(directionSort){
           sortData = copyData.sort(
             (a, b) => { return a.name[field] > b.name[field] ? 1 : -1 }
           )}
           sortData = copyData.reverse(
            (a, b) => { return a.name[field] > b.name[field] ? 1 : -1 }
          )
         console.log(sortData)
     
         contacts.setData(sortData)
         setDirectionSort(!directionSort)
       }

      return (
      <Container className={classes.root}>
         <Grid container spacing={3}>
            <Grid item xs={12} className={classes.headContainer}>
               <Box display="flex" justifyContent="space-between">
                  <Typography variant="h4" component="h1">
                     Table(Reactjs)
                  </Typography>
               </Box>
            </Grid>
            <Grid item xs={12} className={classes.filtersContainer}>
               <ContactsFilters
                  filters={filters}
                  updateFilter={updateFilter}
                  clearFilters={clearFilters} />
            </Grid>
            <Grid item xs={12}>
               {(() => {
                  if (contacts.isLoading) {
                     return <CircularProgress />
                  }
                  if (contacts.isError) {
                     return <div>...error</div>
                  }
                  return <ContactsTable data={filteredContacts} sortData={sortData}
                  directionSort={directionSort}/>;
               })()}
            </Grid>
         </Grid>
      </Container>
   )
}