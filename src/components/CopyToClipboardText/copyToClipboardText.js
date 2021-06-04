import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useCopyToClipboard } from 'react-use';
import Tooltip from '@material-ui/core/Tooltip';
import { useCallback, useState } from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const useStyles = makeStyles((theme) =>
   createStyles({
      root: {
         cursor: 'pointer',
      },
      icon: {
         marginRight: theme.spacing(1),
      }
   })
);

const STATUS_COPY = {
   COPY: 'copy',
   COPIED: 'copied'
}

const TITLE_BY_COPY = {
   [STATUS_COPY.COPY]: 'Copy',
   [STATUS_COPY.COPIED]: 'Copied'
}

export const CopyToClipboardText = ({ text }) => {
   const classes = useStyles();
   const [, copyToClipboard] = useCopyToClipboard();
   const [statusCopy, setStatusCopy] = useState(STATUS_COPY.COPY);

   const onClickCopy = useCallback(() => {
      copyToClipboard(text);
      setStatusCopy("copied")
   }, [copyToClipboard, text])

   const onClickAway = useCallback(() => {
      setStatusCopy("copy")
   }, [setStatusCopy])

   return (
   <ClickAwayListener onClickAway={onClickAway}>
      <Tooltip title={TITLE_BY_COPY[statusCopy]} placement="top" arrow>
         <Button
            display="flex"
            alignItems="center"
            className={classes.root}
            onClick={onClickCopy}>
            <FileCopyOutlinedIcon fontSize="small" className={classes.icon} />
            {text}
         </Button>
      </Tooltip>
      </ClickAwayListener>
   )
}

CopyToClipboardText.propTypes = {
   text: PropTypes.string.isRequired,
}