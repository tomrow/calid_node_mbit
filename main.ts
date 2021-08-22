/**
 * Mode 1 Acts as transmitter
 */
/**
 * Mode 2 acts as receiver
 */
/**
 * prevent interruptions by setting Mode to 0 which does nothing.
 */
function printOut (text: string, ToDisplay: boolean, ToSerial: boolean) {
    if (ToDisplay) {
        basic.showString(text)
    } else if (ToSerial) {
        serial.writeLine(text)
    } else {
    	
    }
}
let Mode = 0
let PrintDisplay = false
let PrintSerial = true
serial.redirectToUSB()
printOut("SELECT MODE A/B", PrintDisplay, PrintSerial)
led.toggle(0, 2)
while (Mode == 0) {
    if (input.buttonIsPressed(Button.A)) {
        Mode = 1
        printOut("MODE A - Transmitter", PrintDisplay, PrintSerial)
        basic.clearScreen()
    } else {
        if (input.buttonIsPressed(Button.B)) {
            Mode = 2
            printOut("MODE B - Reciever", PrintDisplay, PrintSerial)
            basic.clearScreen()
        } else {
            led.toggle(0, 2)
            led.toggle(4, 2)
            basic.pause(1000)
        }
    }
}
loops.everyInterval(1000, function () {
    printOut(convertToText(control.deviceSerialNumber()), PrintDisplay, PrintSerial)
    if (Mode == 1) {
    	
    } else if (Mode == 2) {
    	
    } else {
        printOut("MODE NOT SET ERROR", PrintDisplay, PrintSerial)
    }
})
