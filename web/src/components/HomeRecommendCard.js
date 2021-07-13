import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 294,
        maxWidth: "15vw",
        borderRadius: 24,
        marginLeft: "1vw",
        marginRight: "1vw",
    },
    media: {
        height: 294,
        marginTop: "4ex",
    },
});

function HomeRecommendCard(props) {
    const classes = useStyles();
    const {image, title, content, cost } = props
    return (
        <Card elevation={8} className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={image}
                    title={title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="h6">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {content}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="h5" fontWeight="bold">
                        {cost}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

HomeRecommendCard.defaultProps = {
    title: "Title",
    content: "Type something",
    cost: "98,900"
}

export default HomeRecommendCard;