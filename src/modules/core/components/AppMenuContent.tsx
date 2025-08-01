import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import type { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { Badge } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { useLanguageApp } from '@/store/language';

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    disableScrollLock
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 125,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

type AppMenuContent = {
    i18n: (language: string) => void,
    mobile?:  boolean;
}

const AppMenuContent: React.FC<AppMenuContent>  = ({ i18n, mobile}) => {
  const {language,update:updateLanguage} = useLanguageApp((state) => state);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (language?: string | undefined) => {
      if(language){
          i18n(language);
          switch(language){
            case 'es':
              document.head.lang = language;
              updateLanguage(language);
            break;

            case 'en': 
            document.head.lang = language;
              updateLanguage(language);
            break;

            default: 
            document.head.lang = language;
            updateLanguage('es'); 
          }
      }
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        sx={{background: 'transparent', ":hover": {background:'transparent'}, textTransform: 'lowercase', width: '1rem'}}
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
      >
        <Badge badgeContent={language} color="primary">
            <LanguageIcon className={`${mobile ? 'text-mode-secondary' : 'text-mode-primary'} pointer-events-none`} />
        </Badge>
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
      >
        <MenuItem onClick={() => handleClose('es')} disableRipple>
          Español(ES)
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={() => handleClose('en')} disableRipple>
          English(EN)
        </MenuItem>
      </StyledMenu>
    </div>
  );
};

export default AppMenuContent;