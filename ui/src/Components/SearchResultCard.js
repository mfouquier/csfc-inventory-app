import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './SearchResultCard.css'
import { height } from "@mui/system";


const SearchResultCard = ({ asset }) => {

  console.log(asset)

  return (
    <Card className="searchResultCard" elevation={3} style={{backgroundColor: 'slategray', height:'100%', color:'white', marginTop: 25, width: '100%'}}>

      
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {asset.first_name + ' ' + asset.last_name}
        </Typography>
        <Typography variant="h6">
          {asset.directorate + ' ' + asset.position}
        </Typography>
        <Typography>
            {`Laptop Name: ${asset.laptop_name}`}
        </Typography>
        <Typography>
            {`Laptop S/N: ${asset.laptop_sn}`}
        </Typography>
        <Typography>
            {`Router S/N: ${asset.router_sn}`}
        </Typography>
        <Typography>
            {`Aruba Name: ${asset.aruba_name}`}
        </Typography>
        <Typography>
            {`Cert Expiration: ${asset.cert_exp}`}
        </Typography>
        <Typography>
          {asset.hand_receipt === "No File Uploaded" ? "" : <a href={`http://localhost:8080/uploads/${asset.hand_receipt}`}>2062</a>}
        </Typography>
      </CardContent>

    </Card>
  );
};

export default SearchResultCard;