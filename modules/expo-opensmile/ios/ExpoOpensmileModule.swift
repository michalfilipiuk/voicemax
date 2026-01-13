import ExpoModulesCore

public class ExpoOpensmileModule: Module {
    public func definition() -> ModuleDefinition {
        Name("ExpoOpensmile")

        AsyncFunction("analyzeAudio") { (audioUri: String, config: [String: Any]?, promise: Promise) in
            Task {
                do {
                    let result = try await self.performAnalysis(audioUri: audioUri, config: config)
                    promise.resolve(result)
                } catch {
                    promise.reject("ANALYSIS_ERROR", error.localizedDescription)
                }
            }
        }

        AsyncFunction("getVersion") { () -> String in
            return OpenSmileBridge.shared().getVersion()
        }

        AsyncFunction("isReady") { () -> Bool in
            return OpenSmileBridge.shared().isReady()
        }
    }

    private func performAnalysis(audioUri: String, config: [String: Any]?) async throws -> [String: Any] {
        print("🔷 [Swift] performAnalysis called with URI: \(audioUri)")

        // Check if bridge is ready
        let isReady = OpenSmileBridge.shared().isReady()
        print("🔷 [Swift] Bridge isReady: \(isReady)")

        // Check if file exists
        var cleanPath = audioUri
        if cleanPath.hasPrefix("file://") {
            cleanPath = URL(string: audioUri)?.path ?? audioUri
        }
        let fileExists = FileManager.default.fileExists(atPath: cleanPath)
        print("🔷 [Swift] File exists at \(cleanPath): \(fileExists)")

        // Check for config in bundle
        let configPath = Bundle.main.path(forResource: "eGeMAPSv02_extsink", ofType: "conf", inDirectory: "config/voicemax")
        print("🔷 [Swift] Config path: \(configPath ?? "NOT FOUND")")

        // List bundle contents to debug
        if let resourcePath = Bundle.main.resourcePath {
            do {
                let contents = try FileManager.default.contentsOfDirectory(atPath: resourcePath)
                let configRelated = contents.filter { $0.contains("config") || $0.contains("opensmile") || $0.contains("egemaps") }
                print("🔷 [Swift] Bundle config-related items: \(configRelated)")
            } catch {
                print("🔷 [Swift] Error listing bundle: \(error)")
            }
        }

        print("🔷 [Swift] Calling OpenSmileBridge.analyzeAudioFile...")

        do {
            let result = try OpenSmileBridge.shared().analyzeAudioFile(audioUri) as! [String: Any]
            print("🔷 [Swift] OpenSMILE analysis returned!")

            // Check if this is simulated (pitch.mean == 110) or real
            if let pitch = result["pitch"] as? [String: Any],
               let mean = pitch["mean"] as? Double {
                if mean == 110.0 {
                    print("⚠️ [Swift] WARNING: Got simulated results (pitch=110)")
                } else {
                    print("✅ [Swift] Got REAL OpenSMILE results! Pitch: \(mean) Hz")
                }
            }

            self.logResults(result)
            return result
        } catch {
            print("🔷 [Swift] OpenSMILE error: \(error)")
            throw error
        }
    }

    private func logResults(_ result: [String: Any]) {
        print("═══════════════════════════════════════════")
        print("📊 VOICE ANALYSIS RESULTS")
        print("═══════════════════════════════════════════")

        if let pitch = result["pitch"] as? [String: Any] {
            print("🎤 PITCH")
            print("   Mean: \(String(format: "%.1f", pitch["mean"] as? Double ?? 0)) Hz")
            print("   Min:  \(String(format: "%.1f", pitch["min"] as? Double ?? 0)) Hz")
            print("   Max:  \(String(format: "%.1f", pitch["max"] as? Double ?? 0)) Hz")
        }

        print("───────────────────────────────────────────")

        if let detailed = result["detailed"] as? [String: Any] {
            print("📈 CLINICAL METRICS")
            print("   Jitter:  \(String(format: "%.2f", detailed["jitterPercent"] as? Double ?? 0))%")
            print("   Shimmer: \(String(format: "%.2f", detailed["shimmerDb"] as? Double ?? 0)) dB")
            print("   HNR:     \(String(format: "%.1f", detailed["hnrDb"] as? Double ?? 0)) dB")
        }

        print("───────────────────────────────────────────")

        if let quality = result["quality"] as? [String: Any] {
            print("✨ MASCULINITY SCORES")
            print("   Depth:     \(String(format: "%.0f", quality["depth"] as? Double ?? 0))")
            print("   Resonance: \(String(format: "%.0f", quality["resonance"] as? Double ?? 0))")
            print("   Power:     \(String(format: "%.0f", quality["power"] as? Double ?? 0))")
            print("   Control:   \(String(format: "%.0f", quality["control"] as? Double ?? 0))")
            print("   Overall:   \(String(format: "%.0f", quality["overall"] as? Double ?? 0))")
        }

        print("───────────────────────────────────────────")

        if let formants = result["formants"] as? [String: Any] {
            print("🔊 FORMANTS")
            print("   F1: \(String(format: "%.0f", formants["f1"] as? Double ?? 0)) Hz")
            print("   F2: \(String(format: "%.0f", formants["f2"] as? Double ?? 0)) Hz")
            print("   F3: \(String(format: "%.0f", formants["f3"] as? Double ?? 0)) Hz")
            print("   Vocal Tract: \(String(format: "%.1f", formants["vocalTractLength"] as? Double ?? 0)) cm")
        }

        print("═══════════════════════════════════════════")
    }
}
