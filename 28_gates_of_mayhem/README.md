## Gates of Mayhem

Author: pseudonymous

Category: Hardware

Level: Medium

## Description
Something shifts in the circuitry – slow and deliberate. Your badge brightens to its rim, and the corridor seems to lean toward this door. This is the last lock of this run: clear it, and the climb turns toward its final stretch. Beyond, the steps grow fewer and steeper, the keys heavier, the returns richer. The Citadel isn’t only blocking you; it’s deciding whether to trust you with what comes next.

The guardian of this floor steps forward, a being of twisting wires and glowing circuits, its eyes blinking like LEDs. In its hands is a small hardware lock, a tangle of transistors and logic gates standing between you and the next floor. You must examine the circuit and determine its output. Only by solving it will the path ahead open and allow you to continue your ascent.

## Writeup

- convert the transistors to the logical expression: `(in1 & in2) ^ ((in3 & in4) & (in5 | in6))`
- using the given input_sequence, script the inputs and get the flag.

**FLag:** `citadel{1_l0v3_t0_3xpl01t_l0g1c}`
