import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import "../../assets/css/planGridCard.css";

const useStyles = makeStyles({
  root: {
    height: 350,
  },
  media: {
    height: 200,
  },
  info: {
    marginLeft: "auto",
  },
});
const hasTouch = () => {
  return (
    "ontouchstart" in document.documentElement ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
};

const PlanGridCard = ({
  Plan,
  planDetails,
  onEditClick,
  isCreatedByUser,
  isFollowed,
  onFollow,
  onUnfollow,
}) => {
  const [isShown, setIsShown] = useState(hasTouch);
  const viewPlan = () => {
    planDetails(Plan);
  };
  const handleEdit = () => {
    onEditClick(Plan);
  };

  const handleFollow = () => {
    onFollow(Plan.id);
  };

  const handleUnfollow = () => {
    onUnfollow(Plan.id);
  };
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} m={4} lg={3}>
      <Card
        className={classes.root}
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
      >
        <CardActionArea onClick={viewPlan}>
          <CardMedia
            className={classes.media}
            image={
              Plan.coverImageUrl ||
              "https://static.tildacdn.com/tild3064-3265-4464-a534-396633306234/94459CB2-9585-4889-8.jpg"
            }
            title={Plan.title}
          />
          <CardContent>
            <Typography
              gutterBottom
              display="block"
              noWrap={true}
              variant="h5"
              component="h7"
            >
              {Plan.title}
            </Typography>
            <Typography
              variant="body2"
              display="block"
              noWrap={true}
              color="textSecondary"
              component="p"
            >
              {Plan.subject}
            </Typography>
          </CardContent>
        </CardActionArea>

        {isShown && (
          <CardActions disableSpacing>
            {isFollowed ? (
              <IconButton
                size="small"
                aria-label="unfollow"
                color="secondary"
                onClick={handleUnfollow}
              >
                <i className="icofont icofont-heart-alt"></i>
              </IconButton>
            ) : (
              <IconButton
                size="small"
                aria-label="follow"
                onClick={handleFollow}
              >
                <i className="icofont icofont-heart-alt"></i>
              </IconButton>
            )}
            {isCreatedByUser ? (
              <IconButton
                size="small"
                className={classes.info}
                onClick={handleEdit}
              >
                <i className="fa fa-pencil"></i>
              </IconButton>
            ) : (
              <div></div>
            )}
          </CardActions>
        )}
      </Card>
    </Grid>
  );
};

PlanGridCard.propTypes = {
  Plan: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    subject: PropTypes.string,
    overview: PropTypes.string,
    duration: PropTypes.string,
    planTypeId: PropTypes.number,
    coverImageUrl: PropTypes.string,
    dateCreated: PropTypes.string,
    dateModified: PropTypes.string,
    createdBy: PropTypes.number,
    modifiedBy: PropTypes.number,
  }).isRequired,
  planDetails: PropTypes.func,
  onEditClick: PropTypes.func,
  isCreatedByUser: PropTypes.bool,
  isFollowed: PropTypes.bool,
  onFollow: PropTypes.func,
  onUnfollow: PropTypes.func,
};

export default PlanGridCard;
