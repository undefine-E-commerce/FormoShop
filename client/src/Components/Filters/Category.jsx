import React, { useState } from 'react';
import { useFilters } from '../../hooks/useFilters';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

export const Category = () => {
  const { setFilters } = useFilters();

  const handleChangeCategory = (eventKey) => {
    setFilters((prevState) => ({
      ...prevState,
      category: eventKey,
    }));
  };

  return (
    <Tabs defaultActiveKey="all" id="category-tabs" className="mb-3" onSelect={handleChangeCategory}>
      <Tab eventKey="all" title="Todas">

      </Tab>
      <Tab eventKey="laptops" title="Notebooks">

      </Tab>
      <Tab eventKey="smartphones" title="Celulares">

      </Tab>
    </Tabs>
  );
};
