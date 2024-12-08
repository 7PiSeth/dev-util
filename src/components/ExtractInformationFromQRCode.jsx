import React, { useState } from "react";
import { BsQrCodeScan } from "react-icons/bs";
const { BakongKHQR } = require("bakong-khqr");


const ExtractInformationFromQRCode = () => {
  const [inputText, setInputText] = useState(""); // Stores raw input
  const [formattedText, setFormattedText] = useState(""); // Stores formatted result
  const [notification, setNotification] = useState(""); // Notification message

  // Format the input text into the desired output format
  const formatText = (input) => {
    if (!input.trim()) {
        // Return early if input is empty or contains only whitespace
        return "";
    }

    let result = "";
    const lines = input.split("\n"); // Split the input into lines

    lines.forEach((line) => {
        const [hash, qrString] = line.split("\t"); // Split each line into hash and QR string

        // If qrString is empty or null, use "null" value for the QR string data
        if (!hash) return; // Skip lines without a hash

        let txnType = "null";
        let accountId = "null";
        let merchantName = "null";
        let merchantCity = "null";
        let bankName = "null";

        if (qrString && qrString.trim()) {
            try {
                const data = BakongKHQR.decode(qrString).data; // Decode QR string

                if (data.merchantType === "30") {
                    txnType = "Merchant Payment";
                } else if (data.acquiringBank === "CASHOUT") {
                    txnType = "CASHOUT";
                } else {
                    txnType = "Personal KHQR";
                }

                accountId = data.merchantType === "30" ? data.merchantID : data.accountInformation;
                merchantName = data.merchantName || "null";
                merchantCity = data.merchantCity || "null";
                bankName = getBankName(data.bakongAccountID) || "null";

            } catch (error) {
                console.error("Error processing line:", line, error); // Log errors for debugging
            }
        }

        const strHash = hash.substring(0, 8); // Extract first 8 characters of hash

        result += `${strHash}\t${txnType}\t${bankName}\t${accountId}\t${merchantName}\t${merchantCity}\n`;
    });

    return result;
};
  
  // Retrieve the bank name based on the card number
  const getBankName = (cardNum) => {
    const bankList = {
      cadi: "Canadia Bank Plc",
      cmcb: "Chip Mong Commercial Bank Plc.",
      nbchq: "National Bank of Cambodia",
      nbco: "National Bank of Cambodia (Operation)",
      cpbl: "Cambodian Public Bank Plc",
      cpbp: "Cambodia Post Bank Plc",
      vbl: "Vattanac Bank",
      pras: "PRASAC MFI Plc",
      lolc: "LOLC (Cambodia) Plc.",
      amkb: "AMK Microfinance Plc.",
      ppcb: "Phnom Penh Commercial Bank",
      hklb: "Hattha Bank Plc",
      emny: "eMoney",
      chbc: "Chief (Cambodia) Commercial Bank Plc.",
      hdsb: "Phillip Bank Plc",
      pinc: "PRINCE BANK PLC",
      mdatae: "Maybank Cambodia PLC",
      abaa: "ABA Bank",
      sbpl: "Sathapana Bank Plc",
      amrt: "Amret Plc.",
      lypp: "LY HOUR PAY PRO PLC",
      cznb: "KB KOOKMIN BANK CAMBODIA PLC.",
      shbk: "Shinhan Bank Cambodia Plc",
      ipay: "ipay88",
      aclb: "ACLEDA Bank Plc.",
      trmc: "TrueMoney Cambodia",
      wbkh: "Woori Bank (Cambodia) Plc.",
      idbc: "BIDC Bank",
      sppb: "Speedpay PLC",
      ftcc: "Foreign Trade Bank of Cambodia",
      cool: "Cool Cash Plc",
      adeo: "APD Bank",
      moha: "MOHANOKOR MFI Plc.",
      cabc: "Cambodia Asia Bank",
      orbp: "Oriental Bank",
      aswl: "Asia Wei Luy",
      wing: "Wing Bank (Cambodia) Plc",
      biob: "B.I.C (Cambodia) Bank Plc.",
      sbhr: "SBI LY HOUR Bank Plc.",
      hldata: "Hong Leong Bank (Cambodia) Plc",
    };

    const bankIdentifier = cardNum.split("@")[1]; // Extract the bank identifier after '@'
    return bankList[bankIdentifier] || null; // Return the corresponding bank name or null if not found
  };

  // Handle input change and update formatted text
  const handleTextChange = (e) => {
    const input = e.target.value;
    setInputText(input); // Update raw input
    setFormattedText(formatText(input)); // Update formatted text
  };

  // Copy formatted text to clipboard and show notification
// Copy formatted text to clipboard and show notification
const handleCopyToClipboard = () => {
  if (formattedText && formattedText.trim() !== "") {
    navigator.clipboard.writeText(formattedText);
    setNotification("Copied successfully✔️");
    setTimeout(() => setNotification(""), 1000); // Clear notification after 1 second
  } else {
    setNotification("No text to copy❌");
    setTimeout(() => setNotification(""), 1000); // Clear notification after 1 second
  }
};

  // Count the number of non-empty lines in the input text
  const lineCount = inputText.trim().split("\n").filter((line) => line.trim()).length;

  return (
    <div 
    data-aos="fade-up"
    data-aos-offset="100"
    className="relative flex flex-col items-center">
      <label className="absolute -top-10 left-10 flex gap-4">
        <BsQrCodeScan size={30}/>
        Extract information from QR code
      </label>
      {/* Notification display */}
      {notification && (
        <div className="absolute p-4 rounded-md dark:light-mode dark-mode text-center w-fit top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {notification}
        </div>
      )}
      <div className="flex justify-evenly w-full">
        {/* Raw input textarea */}
        <textarea
          wrap="off"
          className="rounded-lg text-sm w-[45%] h-[85vh] overflow-ellipsis"
          value={inputText}
          onChange={handleTextChange}
          placeholder="Input a list, separated by line breaks"
          autoFocus
        />

        {/* Label displaying line count */}
        <label className="mt-2 text-center">
          Items Count: <p className="text-xl">{lineCount}</p>
        </label>

        {/* Formatted output textarea */}
        <textarea
          wrap="off"
          className="overflow-hidden rounded-lg text-sm w-[45%] h-[85vh] border border-transparent cursor-pointer hover:border-blue-500 hover:shadow-md transition-all active:scale-105 duration-300"
          value={formattedText}
          readOnly
          placeholder="Result"
          onClick={handleCopyToClipboard}
        />
      </div>
    </div>
  );
};

export default ExtractInformationFromQRCode;