
import axios from 'axios';

export const API_URL = "http://localhost:5157/api/Formulaire";

export const getFormByformIDSiteId = async (siteWebId, formId) => {
  try {
    const response = await axios.get(`${API_URL}/${siteWebId}/${formId}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    console.log("Calling API with siteWebId:", siteWebId, "and formId:", formId);
    console.log("Response: ", response.data);
    return response.data;
  } catch (error) {
    console.log('Error while calling getFormByformIDSiteId API ', error);
    throw error;
  }
};
export const submitForm = async (body, excelFileLink) => {
  const formData = new FormData();
  body.forEach((item, index) => {
    // Append text fields with exact key names
    formData.append(`Body[${index}].Titre`, item.Titre);
    formData.append(`Body[${index}].ImageLink`, String(item.ImageLink));

    if (item.ImageLink && item.RespenseFile) {
      formData.append(`Body[${index}].RespenseFile`, item.RespenseFile, item.RespenseFile.name);
    }
    if (!item.ImageLink) {
      formData.append(`Body[${index}].RespenseText`, item.RespenseText || '');
    }
  });

  // Append ExcelFileLink
  formData.append('ExcelFileLink', excelFileLink);

  try {
    const response = await axios.post(`${API_URL}/submit`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Error while submitting form:', error);
    throw error;
  }
};



const form = {
    "formulaire": {
      "head": {
        "title": "titre formulaire"
      },
      "body": [
        {
          "titre": "titreee",
          "champText": true,
          "imageLink": false,
          "required":true,
          
        },
        {
          "titre": "titreee",
          "champText": false,
          "imageLink": true,
          "required":false,
         
        }
      ],
      "footer": {
        "titre": "footer formulaireeee un sabmit it "
      }
    },
    "excelFileLink": "1YUtNSRBd3uiioJ2pFv2Xy-Z4BQXCnIpo_az44LZG920"
  }