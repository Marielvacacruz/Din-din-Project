import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {addToFavorites, removeFromFavorites} from "../../store/favorites";

function FavoriteButton({restaurantId}){
    const dispatch = useDispatch();
    const user =  useSelector(state => state.session.user);

    

};
