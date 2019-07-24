import * as React from "react";
import {connect} from "react-redux";
import {State} from "../store";
import Paper from "@material-ui/core/Paper";
import {
  createStyles,
  GridList,
  GridListTile,
  GridListTileBar,
  makeStyles,
  Theme, withWidth
} from "@material-ui/core";
import {Photos} from "../store/Photos";
import {isWidthUp} from "@material-ui/core/withWidth";
import {Breakpoint} from "@material-ui/core/styles/createBreakpoints";

type ContentProps = State

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: '100%',
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
    titleTitle: {
      height: '24px'
    }
  }),
);

const PhotoList: React.FC<ContentProps & {width: Breakpoint}> = ({photos, errorMessage, width}) => {
  const classes = useStyles();

  const cols = () => {
    if (isWidthUp('xl', width)) {
      return 5;
    }
    if (isWidthUp('lg', width)) {
      return 4;
    }
    if (isWidthUp('md', width)) {
      return 3;
    }
    if (isWidthUp('sm', width)) {
      return 2;
    }
    return 1;
  };

  const photoList = (photos: Photos) => {
    return <GridList cellHeight={360} cols={cols()} className={classes.gridList}>
      {
        photos.map(photo =>
          <GridListTile key={photo.id}>
            <img src={photo.urls.small} alt={photo.description} />
            <GridListTileBar
              title={<span className={classes.titleTitle}>{photo.description}&nbsp;</span>}
              subtitle={<span>by: {photo.user.name || '&nbsp;'}</span>}
            />
          </GridListTile>
        )
      }
    </GridList>;
  };

  // TODO searching and error behaviour
  return <Paper>
    { photos != undefined ? photoList(photos) : null }
  </Paper>

};

function stateToProps(state: State): ContentProps {
  return state;
}

const PhotosContainer = connect(
  stateToProps
)
(withWidth()(PhotoList));

export default PhotosContainer;