import React, { useEffect } from 'react';
import axios from "axios";
import {BASE_URL} from "../index";

export const applyDrag = (arr, dragResult) => {
    const { removedIndex, addedIndex, payload } = dragResult;
    if (Boolean(removedIndex) && Boolean(addedIndex)) return arr;
    const result = [...arr];

    let itemToAdd = payload;

    if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0];
    }

    if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd);
    }
    return result;
};

export const generateItems = (count, creator) => {
    const result = [];
    for (let i = 0; i < count; i++) {
        result.push(creator(i));
    }
    return result;
};