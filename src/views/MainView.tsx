import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { requestRegionAction } from '../store/reducers/countries'
import { Box } from '@material-ui/core';
import { Header, TabPanel } from '../components';
import './MainView.scss';

export default function MainView() {
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestRegionAction())
  }, [dispatch]);

  const handleChange = (event: React.SyntheticEvent<Element, Event>, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box className='main-view'>
      <Header
        activeTab={activeTab}
        onTabChange={handleChange}
      />

      <Box className='main-view__content'>
        <TabPanel grid={{ column: 3, row: 1 }} value={activeTab} index={0} />
        <TabPanel grid={{ column: 3, row: 2 }} value={activeTab} index={1} />
        <TabPanel grid={{ column: 'auto', row: 'auto' }} value={activeTab} index={2} />
      </Box>
    </Box>
  );
}