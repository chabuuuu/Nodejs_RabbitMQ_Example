const amqplib = require('amqplib');
const amqp_url_cloud = 'amqps://oxrmbads:huO93XWEqbo-NdbugJUqtt3T_f_RahYs@octopus.rmq3.cloudamqp.com/oxrmbads'
const amqp_url_docker = 'amqp://localhost:5672'

const receiveNoti = async (severity)=> {
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
        //4. create queue
        const {queue} = await chanel.assertQueue('', {
            exclusive: true
        })
        console.log('name of queue:::', queue);
        //5. Binding
        await chanel.bindQueue(queue, nameExchange, severity)
        await chanel.consume(queue, msg => {
            console.log(msg.content.toString());
        }, {
            noAck: true
        })
    } catch (error) {
        console.log(error.message);
    }
}
const severity = process.argv.slice(2).join(' ') || 'black'
receiveNoti(severity)