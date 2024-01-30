import { useDropzone } from "react-dropzone";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment-timezone";
import _ from "lodash";
import { Button } from "@mui/material";

export function FileUploader({ onUpload, selectedFiles, setSelectedFiles }) {
  const onDrop = (acceptedFiles) => {
    const promises = acceptedFiles.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => {
          resolve(file);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then((result) => {
      if (result.length > 0) {
        setSelectedFiles(result);
      }
    });
  };

  const handleDeleteFile = (file) => {
    return () => {
      const files = selectedFiles.filter((f) => f.name !== file);
      setSelectedFiles(files);
    };
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    // accept: {
    //   "image/png": [".png"],
    //   "image/jpeg": [".jpg", ".jpeg"],
    // },
  });
  return (
    <>
      {selectedFiles.length > 0 ? (
        <Box>
          <Grid item xs={12} md={6}>
            <Typography
              sx={{ mt: 4, mb: 2 }}
              variant="h6"
              component="div"
              style={{ textAlign: "center" }}
            >
              ¿Estas seguro de subir estos archivos?
            </Typography>
            <div>
              <List>
                {_.map(selectedFiles, (file) => (
                  <ListItem
                    key={file.name}
                    secondaryAction={
                      <IconButton
                        onClick={handleDeleteFile(file.name)}
                        edge="end"
                        aria-label="delete"
                      >
                        <DeleteIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={file.name}
                      secondary={moment(file.lastModified).format(
                        "DD [de] MMMM YYYY"
                      )}
                    />
                  </ListItem>
                ))}
              </List>
            </div>
            <div className="flex justify-center items-center">
              <Button
                sx={{ mr: 2 }}
                variant="contained"
                color="error"
                onClick={() => setSelectedFiles([])}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                disabled={selectedFiles.length === 1}
                onClick={() => onUpload()}
              >
                Aceptar
              </Button>
            </div>
          </Grid>
        </Box>
      ) : (
        <div {...getRootProps()} className="w-full">
          <input {...getInputProps()} />
          <div
            className="flex items-center justify-center
                      h-80 border-dashed border-4 border-gray-400 bg-gray-100 rounded-lg cursor-pointer"
          >
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-600">
                Arrastra y suelta tus archivos aquí
              </p>
              <p className="text-sm text-gray-500">
                o haz clic para seleccionar archivos
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
