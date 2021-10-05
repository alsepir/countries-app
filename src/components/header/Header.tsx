import { AppBar, Box, Toolbar, Button, Tabs, Tab } from '@material-ui/core';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';
import FavoriteIcon from '@material-ui/icons/Favorite';
import './Header.scss';

interface Props {
  activeTab: number;
  onTabChange: (event: React.SyntheticEvent, newValue: number) => void;
}

export default function Header({ onTabChange, activeTab }: Props) {
  return (
    <Box>
      <AppBar
        position='static'
        elevation={0}
      >
        <Toolbar className='header__toolbar'>
          <Button>
            <Logo />
          </Button>

          <Box>
            <Tabs value={activeTab} onChange={onTabChange} aria-label='basic tabs example'>
              <Tab label='1 X 3' icon={<FavoriteIcon />} />
              <Tab label='2 X 3' icon={<FavoriteIcon />} />
              <Tab label='SMART' icon={<FavoriteIcon />} />
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
