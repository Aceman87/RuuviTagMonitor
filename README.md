# RuuviTagMonitor
NodeJS RuuviTag monitor

## Install notes
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
reload shell
nvm install 8.16.0
npm install -g pm2
pm2 update
pm2 completion install
pm2 install pm2-logrotate
pm2 startup --> run sudo command
cd RuuviTagMonitor
pm2 start index.js

npm install -g node-gyp
npm install noble
npm install node-ruuvitag
npm install influxdb
```

## Allows to run without sudo
sudo setcap cap_net_raw+eip $(eval readlink -f `which node`)

## InfluxDB schema on the cloud server side
```
schema: [{
    measurement: "ruuvitag",
    fields: {
        dataFormat: Influx.FieldType.INTEGER,
        rssi: Influx.FieldType.INTEGER,
        humidity: Influx.FieldType.INTEGER,
        temperature: Influx.FieldType.FLOAT,
        pressure: Influx.FieldType.INTEGER,
        accelerationX: Influx.FieldType.INTEGER,
        accelerationY: Influx.FieldType.INTEGER,
        accelerationZ: Influx.FieldType.INTEGER,
        battery: Influx.FieldType.INTEGER
    },
    tags: ['id', 'name', 'location']
}]
```
