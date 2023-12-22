const amqplib = require('amqplib');
const amqp_url_cloud = 'amqps://oxrmbads:huO93XWEqbo-NdbugJUqtt3T_f_RahYs@octopus.rmq3.cloudamqp.com/oxrmbads'
const amqp_url_docker = 'amqp://localhost:5672'
const fs = require('fs');
const sendQueue = async ({msg}) => {
    try {
        //1. create connect
        const conn = await amqplib.connect(amqp_url_docker);
        //2. create chanel
        const chanel = await conn.createChannel()
        //3. create queue name 
        const nameQueue = 'q1'
        //4. create queue
        await chanel.assertQueue(nameQueue, {
            durable: false
        })
        //5. send to queue
        for (let index = 0; index < 1; index++) {

            await chanel.sendToQueue(nameQueue, Buffer.from(msg)) 
        }
        console.log("send done");

    } catch (error) {
        console.log(error.message);
    }
}
const msg = process.argv.slice(2).join(' ') || 'Hello'
sendQueue({msg: msg})


const sendFile = async ({file}) => {
    try {
        //1. create connect
        const conn = await amqplib.connect(amqp_url_docker);
        //2. create chanel
        const chanel = await conn.createChannel()
        //3. create queue name 
        const nameQueue = 'file'
        //4. create queue
        await chanel.assertQueue(nameQueue, {
            durable: false
        })
        //5. send to queue
        fs.readFile(file, function(err, fileData) {
            if (err) {
                console.error(err);
                return;
            }
            const test = ["a", "b", "c"]
            // Gửi file data vào queue
            chanel.sendToQueue(nameQueue, Buffer.from(JSON.stringify(test)));

            console.log("File đã được gửi!");
        });
        console.log("send done");

    } catch (error) {
        console.log(error.message);
    }
}

//sendFile({file: '../send.png'})
