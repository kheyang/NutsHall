import React, { Component } from 'react';

import { db } from '../config';

let addName = name => {
    db.ref('/event').child('event').set({name: item})
}