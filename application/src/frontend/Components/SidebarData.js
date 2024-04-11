import React from 'react';
import { faHome, faInfoCircle, faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';

export const SidebarData = [
  //we can also add icons here, havent done it yet tho
     { icon: faHome, to: '/', text: 'Home' },
  { icon: faInfoCircle, to: '/about', text: 'About Us' },
  { icon: faSignInAlt, to: '/login', text: 'Login' },
  { icon: faUserPlus, to: '/signup', text: 'Sign Up' },
  ];