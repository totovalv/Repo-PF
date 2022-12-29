import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Favorite, Settings, AutoStories, CollectionsBookmark} from '@mui/icons-material';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllBooks, getAllUsers , disablePost, deletePost, getCategories,  getGenders, getLanguages, getAllAuthor, getAllSaga, getAllEditorial } from "../../redux/actions";
import MyProducts from "./MyProducts";
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Reviews from '../reviews/Reviews';
import Favorites from "../favorites/Favorites"
import { Grid } from '@mui/material';


const drawerWidth = 240;

function Profile(props) {
  const [component, setComponent] = useState("inicio")
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

   // Call Global States
   const dispatch = useDispatch();
   useEffect(() => {
     dispatch(getAllBooks());
     dispatch(getAllUsers());
     dispatch(getCategories());
     dispatch(getGenders());
     dispatch(getLanguages());
     dispatch(getAllAuthor());
     dispatch(getAllSaga());
     dispatch(getAllEditorial());
   }, [dispatch]);
 
   // Global States
   const allBooks = useSelector((state) => state.allbooks);
   const loadBooks = useSelector((state) => state.books);
   const allUsers = useSelector((state) => state.users);
 
   // Local States
   let session = JSON.parse(localStorage.getItem("session"));
   let aux = allBooks.filter((e) => e.sellerId === session[0].id);
 
   let [productInput, setProductInput] = useState({});
   const [advice, setAdvice] = useState('');
   console.log(productInput)
   console.log(loadBooks);
 
 
   // Functions
 
 
   async function disableItem(e){
     e.preventDefault();
     let itemId = e.target.value;
     await dispatch(disablePost(itemId));
     dispatch(getAllBooks());
   }
 
   async function deleteItem(e){
     e.preventDefault();
     let itemId = e.target.value;
     await dispatch(deletePost(itemId));
     dispatch(getAllBooks());
   }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const myComponents = [
    {
      text: 'Favorites',
      icon: <Favorite />,
    },
    {
      text: 'My Products',
      icon: <CollectionsBookmark />,
    },
    {
      text: 'My Books',
      icon: <AutoStories/>,
    },
    {
      text: 'Settings',
      icon: <Settings/>,
      path: "/"
    },
  ]


  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {myComponents.map((elm,index) => (
          <ListItem
            button 
            key={index}
            onClick={() => setComponent(elm.text)}
          >
              <ListItemIcon>
                {elm.icon}
              </ListItemIcon>
              <ListItemText primary={elm.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Your Profile
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
          <Grid>
            {component === "My Books" && <>
            <Reviews/>
            </>}
            {
            component === "Favorites" && <>
              <Favorites/>
            </>
            }
             {
            component === "My Products" && <>
              {aux?.map((b) => {
                return (
                  <div key={b._id}>
                    <MyProducts
                      id={b._id}
                      title={b.title}
                      image={b.image}
                      typebook={b.typebook}
                      price={b.price}
                      author={b.author}
                      categorie={b.categorie}
                      editorial={b.editorial}
                      saga={b.saga}
                      language={b.language}
                      gender={b.gender}
                      year={b.year}
                      state={b.state}
                      available={b.available}
                      disable={disableItem}
                      deletes={deleteItem}
                    />
                  </div>
                );
              })}
            </>
            }
          </Grid>
      </Box>
    </Box>
  );
}

Profile.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Profile;
