// load data from csv

import prisma from "../src/modules/db";
import fs from "fs";
import csv from 'csv-parser';
import path from "path";
import { Gender } from "@prisma/client";
import { hashPassword } from "../src/modules/auth";



const paths = ['./prisma/data/challenges.csv', './prisma/data/users.csv', './prisma/data/contents.csv']
const options = [{ schema : "challenges", path : paths[0]}, { schema : "users", path : paths[1]}, { schema : "contents", path : paths[2]}]
const results = {challenges: [], users: [], contents : []};

async function seed(){
    options.map((o)=>{
      fs.createReadStream(o.path)
      .pipe(csv())
      .on('data', async (data) => {
        //read sanitaze and save data from csv
        if (o.schema == "contents"){
          data.likes = parseInt(data.likes)
        }
        if (o.schema == "users"){
          //create a new field password same as the email
          if (data.email === "amatzkaitis0@wunderground.com"){
            data.isAdmin = true;
          }
          data.password = await hashPassword(data.email);
        }
        results[o.schema].push(data);
      })
      .on('end', async ()=>{
        if (o.schema == "challenges"){
          await prisma.challenge.createMany({data: results.challenges})
        }
        if (o.schema == "users"){
          await prisma.user.createMany({data: results.users})
        }
        if (o.schema == "contents"){
          await prisma.content.createMany({data: results.contents})
        }
        /* 
        await Promise.all([
            prisma.user.createMany({data: results.users}),
            prisma.challenge.createMany({data: results.challenges})
          ]) 
        await prisma.content.createMany({data: results.contents})
        */

      })
      .on('error', (error)=>{
        throw new Error("something went wrong in the creation of the seeds: " + error)
      })
  })

}

seed()
console.log("🌱  Seeding. Run 'npx prisma studio' to visualize the database")



