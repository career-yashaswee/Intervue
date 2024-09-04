import React, { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";
import { useNavigate } from "react-router-dom"; // Using useNavigate instead of useHistory
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

const QRCodeScanner = () => {
  const videoRef = useRef(null);
  const [scannedData, setScannedData] = useState(null);
  const [certificateDetails, setCertificateDetails] = useState(null);
  const [permissionDenied, setPermissionDenied] = useState(false); // State for permission handling
  const navigate = useNavigate(); // For navigation

  const myMarkerFoundFunction = () => {
    console.log("Marker found!");
    // do something when the marker is found
  };

  const myMarkerLostFunction = () => {
    console.log("Marker lost!");
    // do something when the marker is lost
  };

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });

        if (videoRef.current) {
          // Ensure that videoRef is defined
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          scanQRCode();
        }
      } catch (error) {
        if (
          error.name === "NotAllowedError" ||
          error.name === "PermissionDeniedError"
        ) {
          setPermissionDenied(true); // Set permission denied state
        } else {
          console.error("Error accessing camera:", error);
        }
      }
    };

    const scanQRCode = () => {
      if (!videoRef.current) return; // Ensure that videoRef is defined before using it
      console.log("videoRef.current:", videoRef.current);
      if (videoRef.current) {
        console.log(
          "videoRef.current.readyState:",
          videoRef.current.readyState
        );
      }
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d", { willReadFrequently: true });

      const scan = () => {
        if (
          videoRef.current && // Ensure videoRef.current is defined
          videoRef.current?.readyState === videoRef.current.HAVE_ENOUGH_DATA
        ) {
          canvas.width = videoRef.current.videoWidth;
          canvas.height = videoRef.current.videoHeight;
          context.drawImage(
            videoRef.current,
            0,
            0,
            canvas.width,
            canvas.height
          );
          const imageData = context.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );
          const qrCode = jsQR(
            imageData.data,
            imageData.width,
            imageData.height
          );

          if (qrCode) {
            setScannedData(qrCode.data);
            fetchCertificateDetails(qrCode.data);
          } else {
            requestAnimationFrame(scan);
          }
        } else {
          requestAnimationFrame(scan);
        }
      };
      scan();
    };

    startCamera(); // Call the function inside useEffect
  }, []);

  const fetchCertificateDetails = async (qrData) => {
    try {
      // const response = await fetch(
      //   `http://localhost:5000/api/certificates/${qrData}`
      // );
      // if (!response.ok) throw new Error("Certificate not found");
      // const data = await response.json();
      setCertificateDetails({
        name: "Yashaswee Kesharwani",
        score: 99,
        testDate: "12-Aug-2023",
        organization: "JAVA",
        endorserAddress: "0x454545454",
        review: "Good",
      });
    } catch (error) {
      console.error("Error fetching certificate details:", error);
    }
  };

  const handleRetryPermission = () => {
    setPermissionDenied(false);
    startCamera(); // Retry camera access
  };

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous route
  };

  return (
    <div>
      {permissionDenied && (
        <Dialog open={permissionDenied}>
          <DialogContent>
            <DialogTitle>Camera Permission Denied</DialogTitle>
            <DialogDescription>
              You have denied the permission to access the camera. To use this
              feature, please enable the camera permission.
            </DialogDescription>
            <DialogFooter>
              <Button onClick={handleRetryPermission}>Try Again</Button>
              <Button variant="secondary" onClick={handleGoBack}>
                Go Back
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      <video ref={videoRef} style={{ width: "100%" }} />
      {/* <a-scene embedded arjs>
        <a-marker
          preset="barcode"
          markerFound={myMarkerFoundFunction}
          markerLost={myMarkerLostFunction}
        >
          {certificateDetails && (
            <a-text
              value={`Name: ${certificateDetails.name}\nScore: ${certificateDetails.score}\nTest Date: ${certificateDetails.testDate}\nOrganization: ${certificateDetails.organization}\nEndorser Address: ${certificateDetails.endorserAddress}\nReview: ${certificateDetails.review}`}
              width="1.5"
              align="center"
              position="0 0.5 0"
            ></a-text>
          )}
        </a-marker>
        <a-entity camera></a-entity>
      </a-scene> */}
      <a-scene
        embedded
        arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;"
      >
        <a-assets></a-assets>

        <a-marker type="barcode" value="6">
          <a-box position="0 0.5 0" color="yellow"></a-box>
        </a-marker>

        {/* <a-marker id="animated-marker" type="barcode" value="4">
          <a-entity gltf-model="#animated-asset" scale="2"></a-entity>
        </a-marker> */}
        <a-entity camera></a-entity>
      </a-scene>
    </div>
  );
};

export default QRCodeScanner;
