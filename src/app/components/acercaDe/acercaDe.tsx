import React from "react";
import { Container, Typography, Button, Grid } from "@mui/material";
import { FaBuilding, FaAward, FaHandshake } from "react-icons/fa";
import { motion } from "framer-motion";
import { useAcercaDeStyles } from "./acercaDeStyles";

const AcercaaDe: React.FC = () => {
  const classes = useAcercaDeStyles();

  return (
    <div>
      <Container className={classes.root}>
        <Typography variant="h2" className={classes.title}>
          Acerca de Nuestra Empresa
        </Typography>
        <Typography variant="h6" className={classes.subtitle}>
          Comprometidos con la excelencia y la innovación.
        </Typography>
        <Grid container spacing={4} className={classes.gridContainer}>
          <Grid item xs={12} md={4}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={classes.iconContainer}
            >
              <FaBuilding className={classes.icon} />
            </motion.div>
            <Typography variant="h5" className={classes.gridTitle}>
              Fundación
            </Typography>
            <Typography variant="body1" className={classes.gridText}>
              Fundada en 2020, hemos crecido rápidamente gracias a nuestra
              dedicación y pasión.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={classes.iconContainer}
            >
              <FaAward className={classes.icon} />
            </motion.div>
            <Typography variant="h5" className={classes.gridTitle}>
              Reconocimientos
            </Typography>
            <Typography variant="body1" className={classes.gridText}>
              Reconocidos por nuestra excelencia en el servicio y la calidad de
              nuestros productos.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={classes.iconContainer}
            >
              <FaHandshake className={classes.icon} />
            </motion.div>
            <Typography variant="h5" className={classes.gridTitle}>
              Compromiso
            </Typography>
            <Typography variant="body1" className={classes.gridText}>
              Estamos comprometidos con nuestros clientes y buscamos superar sus
              expectativas.
            </Typography>
          </Grid>
        </Grid>
        <Button variant="contained" className={classes.learnMoreButton}>
          Aprende más sobre nosotros
        </Button>
      </Container>
    </div>
  );
};

export default AcercaaDe;
