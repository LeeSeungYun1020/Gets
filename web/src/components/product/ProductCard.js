import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Favorite from '@material-ui/icons/Favorite';
import { MdFavorite } from "react-icons/md";
import axios from "axios";
import {useHistory} from "react-router-dom";
const useStyles = makeStyles({
    root: {
        marginRight: 25,
        marginBottom: 25,
        width: 230,
        height: 330
    },
    media: {
        height: 230,
    },
});

const ProductCard = ({item}) => {
    const history = useHistory();
    const classes = useStyles();
    const { brand, name, price, image1ID, id } = item;
    const [favorite, setFavorite] = useState(0);
    const [checked, setChecked] = useState(false);
    useEffect(()=> {
        axios.get(`http://localhost:3000/product/check/favorite/${id}`, { withCredentials: true })
            .then( response => {
                if (response.data.result) {
                    setChecked(true);
                }
                else {
                    setChecked(false);
                }
            })
    })
    useEffect(() => {
        axios.get(`http://localhost:3000/product/count/favorite/${id}`, { withCredentials: true })
            .then( response => {
                setFavorite(response.data.favorite)
            })
    },[favorite])
    const onFavoriteChange = (e) => {
        console.log(e.target.checked)
        if(e.target.checked) {
            axios.get(`http://localhost:3000/product/favorite/${id}`, { withCredentials: true })
                .then( response => {
                })
                .catch(function (error) {
                });
            setFavorite(favorite + 1);
        }
        else {
            axios.get(`http://localhost:3000/product/unfavorite/${id}`, {withCredentials: true})
                .then(response => {
                })
                .catch(function (error) {
                });
            setFavorite(favorite - 1);
        }
    }
    const onCardClick = () => {
        history.push({
            pathname: `/product/${id}`
        })
    }
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <div className = "my_favorit">
                    <FormControlLabel
                        style={{ position:"absolute", zIndex:1}}
                        control={<Checkbox icon={<Favorite />} checkedIcon={<Favorite />} name="checkedH" onChange={onFavoriteChange} checked={checked}/> }
                    />
                </div>
                <CardMedia
                    className={classes.media}
                    title={name}
                    image = {`http://localhost:3000/product/image/${image1ID}`}
                    onClick={onCardClick}
                    style = {{
                        position: 'relative'
                    }}
                >
                </CardMedia>
                <CardContent>
                    <Typography variant="p" component="p" style = {{marginTop: "10px", fontWeight: 600}}>{brand}</Typography>
                    <Typography gutterBottom variant="h5" component="h2">
                        {name}
                    </Typography>
                    <div className="card_info">
                        <div className="card_like">
                            <MdFavorite />
                            <Typography variant="h6" component="h6">{favorite}</Typography>
                        </div>
                            <Typography variant="h5" component="h5" style = {{marginRight: "0", marginLeft:"auto"}}>{price.toLocaleString()}</Typography>
                    </div>

                </CardContent>
            </CardActionArea>
        </Card>
    );
}

ProductCard.defaultProps = {
    title: "Title",
    brand: "브랜드",
    like: "25483",
    cost: "99,900"
}

export default ProductCard;