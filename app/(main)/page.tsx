import { redirect } from 'next/navigation';
import React from 'react';

const WelcomePageRedirect: React.FC = () => {
  redirect('/new-page');
};

export default WelcomePageRedirect;
