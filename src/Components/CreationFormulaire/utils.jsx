// src/Components/utils.js

import { v4 as uuidv4 } from 'uuid';
import { encode } from 'base64-arraybuffer';

export const normalizeData = (bodyItems) => {
  return bodyItems.map(item => ({
    ...item,
    id: uuidv4(),
    Titre: item.Titre,
    Required: item.Required || false,
  }));
};

export const constructPayload = (formTitle, formFooter, bodyItems, design) => {
  const body = bodyItems.map(item => ({
    titre: item.Titre,
    type: item.type,
    respenseText: item.RespenseText,
    required: item.Required || false,
  }));

  return {
    siteWebId: '660d430dcd246c7eb48790f9', // Replace with actual site web ID
    formulaire: {
      head: {
        title: formTitle
      },
      body: body,
      footer: {
        titre: formFooter
      }
    },
    excelFileLink: design.excelFileLink,
    design: {
      productImages: design.productsImages,
      backgroundColor: design.backgroundColor,
      logo: design.logo
    }
  };
};

export const encodeFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      const base64String = encode(reader.result);
      resolve(base64String);
    };
    reader.onerror = reject;
  });
};

export const encodeMultipleFilesToBase64 = async (files) => {
  const base64Promises = files.map(file => encodeFileToBase64(file));
  return Promise.all(base64Promises);
};

export const base64ToBlob = (base64, mimeType) => {
  const byteString = atob(base64.split(',')[1]);
  const arrayBuffer = new ArrayBuffer(byteString.length);
  const intArray = new Uint8Array(arrayBuffer);
  for (let i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i);
  }
  return new Blob([arrayBuffer], { type: mimeType });
};
