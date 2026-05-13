import Foundation
import CoreImage
import UniformTypeIdentifiers
import ImageIO

// Configuration
let img1Path = "grey.png"
let img2Path = "red.png"
let outDir = "transition_frames"
let totalFrames = 90 // 3 seconds at 30 fps

let fileManager = FileManager.default
if !fileManager.fileExists(atPath: outDir) {
    try! fileManager.createDirectory(atPath: outDir, withIntermediateDirectories: true, attributes: nil)
}

let currentPath = fileManager.currentDirectoryPath
let img1URL = URL(fileURLWithPath: "\(currentPath)/\(img1Path)")
let img2URL = URL(fileURLWithPath: "\(currentPath)/\(img2Path)")

guard let ciImg1 = CIImage(contentsOf: img1URL),
      let ciImg2 = CIImage(contentsOf: img2URL) else {
    print("Error: Make sure you have renamed your images to 'grey.png' and 'red.png' and placed them in this folder.")
    exit(1)
}

let width = ciImg1.extent.width
let height = ciImg1.extent.height
// The center of the vocalis muscle is vertically centered, maybe slightly below visual center
// CoreImage origin (0,0) is bottom-left, so height/2 is exact center.
let center = CIVector(x: width / 2.0, y: height / 2.0)

// Max radius to cover the entire square image plus some padding
let maxRadius = sqrt(pow(width/2.0, 2) + pow(height/2.0, 2)) + 200.0

let context = CIContext(options: nil)
let colorSpace = CGColorSpaceCreateDeviceRGB()

print("Generating \(totalFrames) transition frames...")

for i in 0..<totalFrames {
    // t goes from 0.0 to 1.0
    let t = CGFloat(i) / CGFloat(totalFrames - 1)
    
    // Smooth ease-in-out function for an organic feeling expansion
    let progress = t * t * (3.0 - 2.0 * t) 
    
    let radius = progress * maxRadius
    
    // 1. Create a Radial Gradient Mask
    // inputRadius0 is the inner fully opaque circle
    // inputRadius1 is the outer edge where it fades to transparent
    let filter = CIFilter(name: "CIRadialGradient")!
    filter.setValue(center, forKey: kCIInputCenterKey)
    filter.setValue(max(0, radius - 200), forKey: "inputRadius0") // Soft 200px organic feathered edge
    filter.setValue(radius, forKey: "inputRadius1")
    filter.setValue(CIColor.white, forKey: "inputColor0") // Mask = 1
    filter.setValue(CIColor.clear, forKey: "inputColor1") // Mask = 0
    let maskImage = filter.outputImage!
    
    // 2. Blend the Red image over the Grey image using the mask
    let blendFilter = CIFilter(name: "CIBlendWithMask")!
    blendFilter.setValue(ciImg2, forKey: kCIInputImageKey)       // Foreground (red glowing)
    blendFilter.setValue(ciImg1, forKey: kCIInputBackgroundImageKey) // Background (grey static)
    blendFilter.setValue(maskImage, forKey: kCIInputMaskImageKey)
    let blendedImage = blendFilter.outputImage!.cropped(to: ciImg1.extent)
    
    // 3. Save the resulting frame to disk
    let outName = String(format: "transition_%03d.jpg", i + 1)
    let outURL = URL(fileURLWithPath: "\(currentPath)/\(outDir)/\(outName)")
    
    if let cgImage = context.createCGImage(blendedImage, from: blendedImage.extent),
       let destination = CGImageDestinationCreateWithURL(outURL as CFURL, UTType.jpeg.identifier as CFString, 1, nil) {
        
        let options: [CFString: Any] = [
            kCGImageDestinationLossyCompressionQuality: 0.95 // Maximum pristine quality
        ]
        
        CGImageDestinationAddImage(destination, cgImage, options as CFDictionary)
        CGImageDestinationFinalize(destination)
    }
    
    if (i+1) % 10 == 0 {
        print("Generated \(i+1)/\(totalFrames)")
    }
}

print("✅ Done! 90 pristine transition frames saved to the '\(outDir)' folder.")
