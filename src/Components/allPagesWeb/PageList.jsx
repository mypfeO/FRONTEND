import React, { useEffect, useState } from 'react';
import { getPagesByAdmin, createPage, updatePage, deletePage } from '../../Service/PageWeb';
import { Typography, Box, CircularProgress, Grid, Card, CardContent, Button, Snackbar, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import useStyles from './styles';
import CreatePageweb from './CreatePageweb';
import UpdatePageweb from './UpdatePageweb';

const PageList = () => {
  const classes = useStyles();
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(null);
  const navigate = useNavigate();
  const adminId = "65e9fa2e21431808d2448065";  // Replace with actual admin ID

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedPages = await getPagesByAdmin(adminId);
        setPages(fetchedPages);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching pages:', error);
        setErrorMessage('Failed to load pages');
        setLoading(false);
      }
    };

    fetchData();
  }, [adminId]);

  const handleViewForms = (siteWebId) => {
    navigate(`/forms/${siteWebId}`);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOpenUpdateModal = (page) => {
    setCurrentPage(page);
    setUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    setCurrentPage(null);
  };

  const handleOpenDeleteDialog = (page) => {
    setCurrentPage(page);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setCurrentPage(null);
  };

  const handleCreatePage = async (newPage) => {
    try {
      const response = await createPage(newPage);
      const fetchedPages = await getPagesByAdmin(adminId);
      setPages(fetchedPages);
      handleCloseModal();
      setSuccessMessage(response.message);
    } catch (error) {
      console.error('Error creating page:', error);
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessages = Object.values(error.response.data.errors).flat().join(' ');
        setErrorMessage(errorMessages);
      } else {
        setErrorMessage('Failed to create page');
      }
    }
  };

  const handleUpdatePage = async (updatedPage) => {
    try {
      const response = await updatePage(currentPage.id, { ...updatedPage, id: currentPage.id, admin: adminId });
      const fetchedPages = await getPagesByAdmin(adminId);
      setPages(fetchedPages);
      handleCloseUpdateModal();
      setSuccessMessage(response.message);
    } catch (error) {
      console.error('Error updating page:', error);
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessages = Object.values(error.response.data.errors).flat().join(' ');
        setErrorMessage(errorMessages);
      } else {
        setErrorMessage('Failed to update page');
      }
    }
  };

  const handleDeletePage = async () => {
    try {
      await deletePage(currentPage.id);
      const fetchedPages = await getPagesByAdmin(adminId);
      setPages(fetchedPages);
      handleCloseDeleteDialog();
      setSuccessMessage('Page deleted successfully');
    } catch (error) {
      console.error('Error deleting page:', error);
      setErrorMessage('Failed to delete page');
    }
  };

  const handleCloseSnackbar = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  if (loading) return <Box className={classes.center}><CircularProgress /></Box>;

  return (
    <Box className={classes.root}>
      <Typography variant="h3" className={classes.header}>Your Pages Web</Typography>
      <Box className={classes.buttonContainer}>
        <Button variant="contained" color="primary" onClick={handleOpenModal} className={classes.button}>
          Create New Page Web
        </Button>
      </Box>
      <Grid container spacing={3} justifyContent="center">
        {pages.map((page) => (
          <Grid item xs={12} key={page.id}>
            <Card className={classes.card}>
              <CardContent className={classes.cardContent}>
                <Typography variant="h5" component="div" className={classes.cardTitle}>
                  {page.name}
                </Typography>
                <Typography variant="h6" component="div" className={classes.cardTheme}>
                  {page.theme}
                </Typography>
              </CardContent>
              <Box display="flex" alignItems="center">
                <Button variant="contained" className={classes.button} onClick={() => handleViewForms(page.id)}>
                  View Forms
                </Button>
                <IconButton onClick={() => handleOpenUpdateModal(page)} className={classes.iconButton} style={{ color: 'blue' }}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleOpenDeleteDialog(page)} className={classes.iconButton} style={{ color: 'red' }}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      <CreatePageweb
        open={modalOpen}
        handleClose={handleCloseModal}
        handleCreatePage={handleCreatePage}
        adminId={adminId}
      />
      {currentPage && (
        <UpdatePageweb
          open={updateModalOpen}
          handleClose={handleCloseUpdateModal}
          handleUpdatePage={handleUpdatePage}
          page={currentPage}
          adminId={adminId}
        />
      )}
    <Dialog
           open={deleteDialogOpen}
           onClose={handleCloseDeleteDialog}
           PaperProps={{
             style: {
      backgroundColor: 'white', // Set the background color to white
      padding: '20px',
      width: '600px', // Make the dialog wider
      color: 'white',
    },
  }}
>
  <DialogTitle>Confirm Delete</DialogTitle>
  <DialogContent>
    <DialogContentText style={{ color: 'white' }}>
      Are you sure you want to delete this page?
    </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseDeleteDialog} style={{ color: '#bdbde7' }}>
      Cancel
    </Button>
    <Button onClick={handleDeletePage} style={{ color: 'red' }}>
      Delete
    </Button>
  </DialogActions>
</Dialog>
      <Snackbar
        open={Boolean(successMessage)}
        message={successMessage}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      />
      <Snackbar
        open={Boolean(errorMessage)}
        message={errorMessage}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      />
    </Box>
  );
};

export default PageList;
