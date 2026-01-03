import React from 'react';
import Header from '../components/Home/Header';
import HeroArea from '../components/Home/HeroArea';
import StepsArea from '../components/Home/StepsArea';
import CMSArea from '../components/Home/CMSArea';
import ServicesArea from '../components/Home/ServicesArea';
import Subscribe from '../components/Home/Subscribe';
import Footer from '../components/Home/Footer';
import SEO from '../components/seo';

export default function Home() {
  return (
    <>
      <SEO pageTitle={'Home'} />
      <Header />
      <HeroArea />
      <StepsArea />
      <CMSArea />
      <ServicesArea />
      <Subscribe />
      <Footer />
    </>
  );
}
