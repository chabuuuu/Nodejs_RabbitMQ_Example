const amqplib = require('amqplib');
const amqp_url_cloud = 'amqps://oxrmbads:huO93XWEqbo-NdbugJUqtt3T_f_RahYs@octopus.rmq3.cloudamqp.com/oxrmbads'
const amqp_url_docker = 'amqp://localhost:5672'

const postVideo = async ({msg})=> {
    try {
        //1. create connect
        const conn = await amqplib.connect(amqp_url_docker);
        //2. create chanel
        const chanel = await conn.createChannel()
        //3. create exchange
        const nameExchange = 'direct-exchange'
        await chanel.assertExchange(nameExchange, 'direct', {
            durable: false
        })
        //4. publish video
        await chanel.publish(nameExchange, 'green', Buffer.from(msg))
        console.log('Send OK');

        setTimeout(() => {
            conn.close();
            process.exit(0);
        }, 2000);
    } catch (error) {
        console.log(error.message);
    }
}

const msg = process.argv.slice(2).join(' ') || 'Hello exchange'
postVideo({msg: msg})