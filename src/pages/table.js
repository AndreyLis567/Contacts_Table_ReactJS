import React, { useState } from 'react';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import { CopyToClipboardText } from '../components/CopyToClipboardText/copyToClipboardText';
import { NATIONALITIES_HUMAN_NAME } from './../constants/nationalities';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const useStyles = makeStyles({
  table: {},
});

export const ContactsTable = ({ data, sortData, directionSort }) => {
  const classes = useStyles();
  const [fieldData, setFieldData] = useState('');

  const Arrow = () => {
    return (
      directionSort ? (<div style={{display: 'inline', verticalAlign: 'middle'}}>
        <ArrowDownwardIcon fontSize="small" />
      </div>)
        :( <div style={{display: 'inline', verticalAlign: 'middle'}}>
          <ArrowUpwardIcon fontSize="small" />
        </div>)
    )
  }

  const fieldSortData = (field) => {
    sortData(field)
    setFieldData(field)
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>
              Avatar
            </TableCell>
            <TableCell onClick={() => fieldSortData('first')}>
              Full name <Arrow />
            </TableCell>
            <TableCell>Birthday</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Nationality</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((contact) => (
            <TableRow key={contact.login.uuid}>
              <TableCell component="th" scope="row">
                <Avatar alt="" src={contact.picture.thumbnail} />
              </TableCell>
              <TableCell>{contact.name.title} {contact.name.first} {contact.name.last}</TableCell>
              <TableCell>
                <Typography>{format(parseISO(contact.dob.date), 'iiii MM/dd/yyyy h:m:s a')}</Typography>
                <Typography>{contact.dob.age} years</Typography>
              </TableCell>
              <TableCell>
                <CopyToClipboardText text={contact.email}></CopyToClipboardText>
              </TableCell>
              <TableCell>
                <CopyToClipboardText text={contact.phone}></CopyToClipboardText>
              </TableCell>
              <TableCell>
                <Typography>{contact.location.country} </Typography>
                <Typography>{contact.location.city}, {contact.location.street.name} {contact.location.street.number} </Typography>
              </TableCell>
              <TableCell>{NATIONALITIES_HUMAN_NAME[contact.nat]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}