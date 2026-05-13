import Foundation
import AVFoundation

let videoPath = "Enhancer-Ultra HD-Orb_transitioning_in_clinic_lobby_202605120008 (online-video-cutter.com).mp4"
let outDir = "public/orb-frames"

let videoURL = URL(fileURLWithPath: videoPath)
let asset = AVAsset(url: videoURL)
let generator = AVAssetImageGenerator(asset: asset)
generator.appliesPreferredTrackTransform = true
generator.requestedTimeToleranceBefore = .zero
generator.requestedTimeToleranceAfter = .zero

let group = DispatchGroup()
group.enter()

Task {
    do {
        let duration = try await asset.load(.duration)
        let durationSeconds = CMTimeGetSeconds(duration)
        let tracks = try await asset.loadTracks(withMediaType: .video)
        let fps = try await tracks.first?.load(.nominalFrameRate) ?? 30.0
        
        let totalFrames = Int(durationSeconds * Double(fps))
        print("Extracting \(totalFrames) frames at \(fps) fps...")
        
        for i in 0..<totalFrames {
            let time = CMTime(value: CMTimeValue(i), timescale: CMTimeScale(fps))
            let cgImage = try generator.copyCGImage(at: time, actualTime: nil)
            
            let destURL = URL(fileURLWithPath: String(format: "%@/frame_%03d.jpg", outDir, i + 1))
            guard let destination = CGImageDestinationCreateWithURL(destURL as CFURL, kUTTypeJPEG, 1, nil) else { continue }
            
            let options: [CFString: Any] = [
                kCGImageDestinationLossyCompressionQuality: 0.95
            ]
            
            CGImageDestinationAddImage(destination, cgImage, options as CFDictionary)
            CGImageDestinationFinalize(destination)
            
            if (i+1) % 10 == 0 { print("Saved \(i+1)/\(totalFrames)") }
        }
        
        print("Successfully extracted \(totalFrames) frames")
        
        let resultPath = "frames_count.txt"
        try String(totalFrames).write(toFile: resultPath, atomically: true, encoding: .utf8)
        
    } catch {
        print("Error: \(error)")
    }
    group.leave()
}

group.wait()
