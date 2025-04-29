import { json, Request, Response } from "express";
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
        res.status(200).json({ dates });
    
      } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message }); 
      }
}

export const getCalComAvailableSlotTimes = async (req: Request, res: Response) => {
  try {
    if (!process.env.CALCOM_AUTHORIZATION) {
      throw new Error('CALCOM_AUTHORIZATION is not set in the environment variables.');
    }

    const date = req.query.date as string;
    console.log('date: ', date);
    if (!date) {
      res.status(400).json({ error: 'Date query parameter is required' });
      return;
    }

    const options = {
      method: 'GET',
      headers: {
        Authorization: process.env.CALCOM_AUTHORIZATION,
        'cal-api-version': '2024-09-04', 
      },
    };

    const url = `https://api.cal.com/v2/slots?eventTypeId=${process.env.CALCOM_EVENT_ID}&start=${date}&end=${date}`;

    const response: any = await fetch(url, options);
    const data: any = await response.json();

    if (!response.ok) {
      console.error(`Cal.com API error. Status: ${response.status}`);
      console.error('Response body:', data);
      res.status(500).json({ error: 'Failed to fetch data', details: data });
      return;
    }

    const times = [];

    for (const date in data.data) {
      const slots = data.data[date];
      for (const slot of slots) {
        const time = new Date(slot.start).toLocaleTimeString('en-GB', {
          timeZone: 'Asia/Beirut',
          hour: '2-digit',
          minute: '2-digit',
        });
        times.push(time);
      }
    }

    console.log(times); 
    res.status(200).json({ times });

  } catch (error) {
    console.error('Error:', error.message);
    if(!res.headersSent) {
      res.status(500).json({ error: error.message });
    } 
  }
}

export const scheduleCalCom = async (req: Request, res: Response) => {
  try {
    if (!process.env.CALCOM_AUTHORIZATION) {
      throw new Error('CALCOM_AUTHORIZATION is not set in the environment variables.');
    }

    const reqBody = req.body;
    if (!reqBody) {
      res.status(400).json({ error: 'Date query parameter is required' });
      return;
    }

    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'cal-api-version': '2024-08-13',
      },
      body: JSON.stringify(reqBody),
    };
    console.log('options: ', options);
    const url = 'https://api.cal.com/v2/bookings';
    console.log('url: ', url);
    console.log('reqBody: ', reqBody);

    const response: any = await fetch(url, options);
    const data: any = await response.json();

    if (!response.ok) {
      res.status(500).json({ error: 'Failed to fetch data', details: data });
      return;
    }

    res.status(200).json({ 'success: ': data });

  } catch (error) {
    console.error('Error:', error.message);
    if(!res.headersSent) {
      res.status(500).json({ error: error.message });
    } 
  }
}