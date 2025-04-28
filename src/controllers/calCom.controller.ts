import { Request, Response } from "express";
import fetch from "node-fetch";
import { getStartDate, getEndDate } from "../utils/dates";
import dotenv from 'dotenv';

dotenv.config();

export const getCalCom = async (req: Request, res: Response) => {
    try {
        if (!process.env.CALCOM_AUTHORIZATION) {
          throw new Error('CALCOM_AUTHORIZATION is not set in the environment variables.');
        }
    
        const options = {
          method: 'GET',
          headers: {
            Authorization: process.env.CALCOM_AUTHORIZATION,
            'cal-api-version': '2024-09-04', 
          },
        };

        const url = `https://api.cal.com/v2/slots?eventTypeId=${process.env.CALCOM_EVENT_ID}&start=${getStartDate()}&end=${getEndDate()}`;
    
        const response = await fetch(url, options);
        const data: any = await response.json();

        if (!response.ok) {
          throw new Error(`Failed to fetch data`);
        }

        const dates = Object.keys(data.data);
    
        console.log(dates); 
        res.status(200).json({dates});
    
      } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message }); 
      }
}
