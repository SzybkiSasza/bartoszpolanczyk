import { redirect } from 'next/navigation';
import React from 'react';

const WelcomePageRedirect: React.FC = () => {
  redirect('/welcome');
};

export default WelcomePageRedirect;
