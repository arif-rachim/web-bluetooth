# Bluetooth Communication Demo
#### This project demonstrates Bluetooth communication between devices using web Bluetooth API. It allows users to interact with Bluetooth devices, retrieve device details, battery information, and device information. The project is built with React and TypeScript.

## Features:
- Device Connection:
Users can request device details and connect to the Bluetooth GATT server.
- Battery Information:
Check battery status and percentage.
- Device Information:
Retrieve various device information like manufacturer name, model number, firmware version, etc.

## Usage:
Click "Get Device Details" to retrieve Bluetooth device information.
Once the device is connected, further options become available:
Check battery status and percentage.
Retrieve device information.
Click on respective buttons to perform actions and retrieve information.
Messages regarding actions performed are displayed at the bottom.

Author:
Arif (GAL2729)

Prepared for demo purposes.
- Components:
- Button: A custom button component for interaction.
- Visible: A utility component to conditionally render children based on a boolean condition.

### Notes:
Ensure that your device supports Bluetooth and is discoverable.
Make sure the device is within range and Bluetooth is enabled on both the device and the host system.
For further details on the API and usage, refer to the comments within the code.

Disclaimer:
This project is for demonstration purposes only. It might require adjustments and further development to suit specific use cases and environments.