import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";

import { fetchCapacityRequest } from "../../slices/capacity";
// import { getCapacity } from "../../selectors/capacity";
import CapacityTable from "./CapacityTable";
import CapacityForm from "./CapacityForm";
import Alert from "./Alert";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1200,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Capacity = () => {
  const dispatch = useDispatch();
  const [openForm, setOpenForm] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [selectedArr, setSelectedArr] = useState();

  // const data = useSelector(getCapacity);

  const handleOnCloseForm = () => {
    setOpenForm(false);
  };

  useEffect(() => {
    dispatch(fetchCapacityRequest());
  }, [dispatch]);

  return (
    <>
      <CapacityTable
        setEditProduct={setEditProduct}
        setDeleteProduct={setDeleteProduct}
        setOpenAlert={setOpenAlert}
        setOpenForm={setOpenForm}
        selectedArr={selectedArr}
        setSelectedArr={setSelectedArr}
      />
      <Modal open={openForm} onClose={handleOnCloseForm}>
        <Box sx={style}>
          <IconButton
            aria-label="close"
            size="small"
            onClick={handleOnCloseForm}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <CapacityForm
            selectedArr={selectedArr}
            editProduct={editProduct}
            setEditProduct={setEditProduct}
            setOpenForm={setOpenForm}
          />
        </Box>
      </Modal>
      <Alert
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        deleteProduct={deleteProduct}
        setDeleteProduct={setDeleteProduct}
      />
    </>
  );
};

export default Capacity;
