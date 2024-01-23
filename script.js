function widthc(f, er) {
    const wh = (3 * Math.pow(10, 11)) / (2 * f);
    const x = Math.sqrt(2 / (er + 1));
    const w = wh * x;
    return w;
}

function effdc(er, h, w) {
    const eff1 = (er + 1) / 2;
    const effd = (er - 1) / 2;
    const eff2 = effd * Math.pow((1 + 12 * (h / w)), -0.5);
    const effdc1 = eff1 + eff2;
    return effdc1;
}

function dl(h, effdic, width) {
    const dlnum = (effdic + 0.3) * ((width / h) + 0.264);
    const dlden = (effdic - 0.258) * ((width / h) + 0.8);
    const dl1 = dlnum / dlden;
    const dl = 0.412 * h * dl1;
    return dl;
}

function acl(f, effdic, odl) {
    const ln = (3 * Math.pow(10, 11));
    const ld = 2 * f * Math.sqrt(effdic);
    const l1 = ln / ld;
    const l = l1 - (2 * odl);
    return l;
}

function calculateAntennaParameters() {
    const f = parseFloat(document.getElementById("resfreq").value);
    const freqUnit = document.getElementById("freq-unit").value;

    // Convert frequency to Hz based on the selected unit
    let freqInHz;
    switch (freqUnit) {
        case "GHz":
            freqInHz = f * Math.pow(10, 9);
            break;
        case "MHz":
            freqInHz = f * Math.pow(10, 6);
            break;
        case "KHz":
            freqInHz = f * Math.pow(10, 3);
            break;
        case "Hz":
            freqInHz = f;
            break;
        default:
            alert("Invalid frequency unit");
            return;
    }

    const er = parseFloat(document.getElementById("diel-const1").value);
    const h = parseFloat(document.getElementById("diel-hgt").value);

    const width = widthc(freqInHz, er);
    const effdic = effdc(er, h, width);
    const odl = dl(h, effdic, width);

    document.getElementById("resultWidth").innerText = "Width of the patch: " + width + " mm";

    const al = acl(freqInHz, effdic, odl);
    document.getElementById("resultLength").innerText = "Length of patch: " + al + " mm";
}

document.getElementById("calculateButton").addEventListener("click", calculateAntennaParameters);
