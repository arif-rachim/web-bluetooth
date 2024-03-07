/// <reference types="web-bluetooth" />
import styles from './App.module.css'
import {Button} from "./components/Button.tsx";
import {PropsWithChildren, useState} from "react";

function App() {
    const [bluetoothDevice, setBluetoothDevice] = useState<BluetoothDevice | null>(null);
    const [remoteGATTServer, setRemoteGATTServer] = useState<BluetoothRemoteGATTServer | null>(null);
    const [battery, setbattery] = useState<BluetoothRemoteGATTService | null>(null);
    const [deviceInfo, setDeviceInfo] = useState<BluetoothRemoteGATTService | null>(null);
    const [batteryPercentage, setBatteryPercentage] = useState<number | null>(null);
    const [infoValues, setInfoValues] = useState<string[] | null>(null);
    const [messages, setMessages] = useState<string[]>([]);

    function log(...args: string[]) {
        const date = new Date().toLocaleTimeString().substring(3,8);
        setMessages(old => ([...old,`[${date}] ${args.join(' ')}`]));
    }
    function wrap(callback:Function){
        return (...args:any[]) => {
            log('[start]',callback.name);
            try{
                callback.apply(null,args).then(() => {
                    log('[succs]',callback.name);
                }).catch((err:any) => {
                    log('[error]',callback.name,':',err.message);
                });
            }catch(err:any){
                log('[error]',callback.name,err.message);
            }

        }
    }
    async function getDeviceDetails() {
        const device = await navigator.bluetooth.requestDevice({
            optionalServices: ["battery_service", "device_information"],
            acceptAllDevices: true,
        });
        setBluetoothDevice(device);
    }

    async function connectToGattServer() {
        if (!bluetoothDevice) {
            throw new Error('BluetoothDevice not available')
        }
        if (!bluetoothDevice.gatt) {
            throw new Error('GATT not available')
        }
        const server = await bluetoothDevice.gatt.connect();
        setRemoteGATTServer(server);
    }

    async function checkBattery() {
        if (!remoteGATTServer) {
            throw new Error('RemoteGATTServer is not available')
        }
        const batteryService = await remoteGATTServer.getPrimaryService("battery_service");
        setbattery(batteryService);
    }

    async function checkDeviceInfo() {
        if (!remoteGATTServer) {
            throw new Error('RemoteGATTServer is not available')
        }
        const infoService = await remoteGATTServer.getPrimaryService("device_information");
        setDeviceInfo(infoService);
    }

    const noDevice = bluetoothDevice === null;
    const hasDevice = !noDevice;
    const noGattServer = remoteGATTServer === null;
    const hasGattServer = !noGattServer;
    const noBatteryInfo = battery === null;
    const hasBatteryInfo = !noBatteryInfo;
    const noDeviceInfo = deviceInfo === null;
    const hasDeviceInfo = !noDeviceInfo;
    const noInfoValues = infoValues === null;
    const hasInfoValues = !noInfoValues;

    async function checkBatteryPercentage() {
        if (!battery) {
            throw new Error('BatteryInfo is not available')
        }

        const batteryLevelCharacteristic = await battery.getCharacteristic("battery_level");
        const batteryLevel = await batteryLevelCharacteristic.readValue();
        const batteryPercent = batteryLevel.getUint8(0);
        setBatteryPercentage(batteryPercent);
    }

    async function checkDeviceInfoText() {
        if (!deviceInfo) {
            throw new Error('DeviceInfo is not available')
        }
        const infoCharacteristic = await deviceInfo.getCharacteristics();
        const infoValues = [];
        for (const characteristic of infoCharacteristic) {
            const value = await characteristic.readValue();
            infoValues.push(new TextDecoder().decode(value));
        }
        setInfoValues(infoValues);
    }

    return <div className={styles.root}>
        <h1>Bluetooth communication between devices</h1>
        <h5>Prepared by Arif (GAL2729) for demo purpose</h5>
        <Visible when={noDevice}>
            <Button onClick={wrap(getDeviceDetails)}>Get Device Details</Button>
        </Visible>
        <Visible when={hasDevice}>
            <div>
                <label>Device Name</label>
                {bluetoothDevice?.gatt?.device.name}
            </div>
            <Visible when={noGattServer}>
                <Button onClick={wrap(connectToGattServer)}>Connect GATT Server</Button>
            </Visible>
            <Visible when={hasGattServer}>
                <Button>Disconnect GATT Server</Button>
                <Visible when={noBatteryInfo}>
                    <Button onClick={wrap(checkBattery)}>Check Battery</Button>
                </Visible>
                <Visible when={hasBatteryInfo}>
                    <Button onClick={wrap(checkBatteryPercentage)}>Check Battery Percentage</Button>
                    <div>
                        <label>Battery Level</label>
                        <div>{batteryPercentage}</div>
                    </div>
                </Visible>
                <Visible when={noDeviceInfo}>
                    <Button onClick={wrap(checkDeviceInfo)}>Check Device Info</Button>
                </Visible>
                <Visible when={hasDeviceInfo}>
                    <Button onClick={wrap(checkDeviceInfoText)}>Check Device Info Text</Button>
                </Visible>
                <Visible when={hasInfoValues}>
                    <div>
                        <h3>Device Info</h3>
                        <div>{infoValues?.join(' ')}</div>
                    </div>
                </Visible>
            </Visible>
        </Visible>
        <ul>
            {messages.map((m,index) => <li key={index}>{m}</li>)}
        </ul>
    </div>

}

function Visible(props: PropsWithChildren<{ when: boolean }>) {
    return props.when ? props.children : false
}

export default App
