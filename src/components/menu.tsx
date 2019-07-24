import React, { useState } from 'react';
import {
  AppBar,
  createStyles,
  InputBase,
  makeStyles,
  Theme,
  Toolbar,
  Typography
} from "@material-ui/core";
import {fade} from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/Search';
import {connect} from "react-redux";
import {State} from "../store";
import {Action, Dispatch} from "redux";
import {searchFor} from "../store/actions";

type MenuStateProps = {
  searching: boolean
}

type MenuDispatchProps = {
  search: (searchText: string) => void
}

type MenuProps = MenuStateProps & MenuDispatchProps;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 160,
        '&:focus': {
          width: 300,
        },
      },
    }
  })
);

const Menu: React.FC<MenuProps> = ({searching, search}) => {
  const classes = useStyles();

  const [searchText, setSearchText] = useState("");

  return (
    <div className={classes.root}>
      <AppBar>
        <Toolbar variant="dense">
          <Typography className={classes.title} variant="h6" noWrap>
            Unsplash Photo Search
          </Typography>
          <form onSubmit={e => {e.preventDefault(); search(searchText);}}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon/>
              </div>
              <InputBase
                placeholder="Search…"
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{'aria-label': 'Search'}}
              />
            </div>
          </form>
        </Toolbar>
      </AppBar>
      <Toolbar variant="dense" />
    </div>
  );
};

function stateToProps(state: State): MenuStateProps {
  return {
    searching: false
  };
}

function dispatchToProps(dispatch: Dispatch<Action>): MenuDispatchProps {
  return {
    search: (searchText) => {
      dispatch(searchFor(searchText))
    }
  };
}

const MenuContainer = connect(
  stateToProps,
  dispatchToProps
)
(Menu);

export default MenuContainer;