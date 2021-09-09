enum RadioMessage {
    message1 = 49434
}
/**
 * Mode 1 Acts as transmitter
 */
/**
 * Mode 2 acts as receiver
 */
// prevent interruptions by setting Mode to 0 which does nothing.
function printOut (text: string, ToDisplay: boolean, ToSerial: boolean) {
    if (ToDisplay) {
        basic.showString(text)
    }
    if (ToSerial) {
        serial.writeLine(text)
    }
}
radio.onReceivedValue(function (name, value) {
    if (Mode == 2) {
        if (name == "CalidDeclare") {
            RegisteredIDs.push(convertToText(value))
        } else {
            if (0 < RegisteredIDs.length) {
                for (let index = 0; index <= RegisteredIDs.length; index++) {
                    if (name == "" + RegisteredIDs[index] + "temp") {
                        serial.writeLine("" + RegisteredIDs[index] + "temp" + convertToText(value))
                    } else {
                    	
                    }
                }
            }
        }
    } else if (Mode == 2) {
        if (name == "" + convertToText(control.deviceSerialNumber()) + "interval") {
            interval = value
        } else {
        	
        }
    }
})
let Mode = 0
let interval = 0
let RegisteredIDs: string[] = []
RegisteredIDs = []
let PrintSerial = true
let PrintDisplay = false
serial.redirectToUSB()
printOut("SELECT MODE A/B", PrintDisplay, PrintSerial)
led.toggle(0, 2)
interval = 3600000
while (Mode == 0) {
    if (input.buttonIsPressed(Button.A)) {
        radio.setGroup(26694)
        radio.setTransmitSerialNumber(true)
        Mode = 1
        printOut("MODE A - Transmitter", PrintDisplay, PrintSerial)
        basic.clearScreen()
        printOut("Sending out ID...", PrintDisplay, PrintSerial)
        radio.sendValue("CalidDeclare", control.deviceSerialNumber())
    } else {
        if (input.buttonIsPressed(Button.B)) {
            radio.setGroup(26694)
            radio.setTransmitSerialNumber(true)
            Mode = 2
            printOut("MODE B - Reciever", PrintDisplay, PrintSerial)
            basic.clearScreen()
            printOut("Waiting for packets", PrintDisplay, PrintSerial)
        } else {
            led.toggle(0, 2)
            led.toggle(4, 2)
            basic.pause(1000)
        }
    }
}
loops.everyInterval(interval, function () {
    printOut(convertToText(control.deviceSerialNumber()), PrintDisplay, PrintSerial)
    if (Mode == 1) {
        let index = 0
        radio.sendValue("" + RegisteredIDs[index] + "temp", input.temperature())
    } else if (Mode == 2) {
    	
    } else {
        printOut("MODE NOT SET ERROR", PrintDisplay, PrintSerial)
    }
})
