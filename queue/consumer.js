const amqplib = require('amqplib');
const amqp_url_cloud = 'amqps://oxrmbads:huO93XWEqbo-NdbugJUqtt3T_f_RahYs@octopus.rmq3.cloudamqp.com/oxrmbads'
const amqp_url_docker = 'amqp://localhost:5672'
const fs = require('fs');

const receiveQueue = async () => {
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
        //5. receive to queue
        await chanel.consume(nameQueue, msg => {
            console.log('Msg:::', msg.content.toString())
            // fs.writeFile('../received_file.png', msg.content, function(err) {
            //     if (err) {
            //         console.error(err);
            //         return;
            //     }

            //     console.log("File đã được nhận và lưu!");
            // });
        }, 
        {
            noAck: true
        }
        )

    } catch (error) {
        console.log(error.message);
    }
}
receiveQueue()