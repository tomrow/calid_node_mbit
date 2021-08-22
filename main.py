"""

Mode 1 Acts as transmitter

"""
"""

Mode 2 acts as receiver

"""
"""

prevent interruptions by setting Mode to 0 which does nothing.

"""
def printOut(text: str, ToDisplay: bool, ToSerial: bool):
    if ToDisplay:
        basic.show_string(text)
    elif ToSerial:
        serial.write_line(text)
    else:
        pass
Mode = 0
PrintDisplay = False
PrintSerial = True
serial.redirect_to_usb()
printOut("SELECT MODE A/B", PrintDisplay, PrintSerial)
led.toggle(0, 2)
while Mode == 0:
    if input.button_is_pressed(Button.A):
        Mode = 1
        printOut("MODE A - Transmitter", PrintDisplay, PrintSerial)
        basic.clear_screen()
    else:
        if input.button_is_pressed(Button.B):
            Mode = 2
            printOut("MODE B - Reciever", PrintDisplay, PrintSerial)
            basic.clear_screen()
        else:
            led.toggle(0, 2)
            led.toggle(4, 2)
            basic.pause(1000)

def on_every_interval():
    printOut(convert_to_text(control.device_serial_number()),
        PrintDisplay,
        PrintSerial)
    if Mode == 1:
        pass
    elif Mode == 2:
        pass
    else:
        printOut("MODE NOT SET ERROR", PrintDisplay, PrintSerial)
loops.every_interval(1000, on_every_interval)
