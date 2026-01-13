//
//  OpenSmileBridge.h
//  ExpoOpensmile
//
//  Bridge to the OpenSMILE C++ library for voice analysis
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface OpenSmileBridge : NSObject

/// Shared singleton instance
+ (instancetype)shared;

/// Check if OpenSMILE is ready
- (BOOL)isReady;

/// Analyze an audio file and return eGeMAPSv02 features
/// @param audioPath Path to the audio file (WAV format)
/// @param error Error output
/// @return Dictionary with analysis results, or nil on error
- (nullable NSDictionary *)analyzeAudioFile:(NSString *)audioPath
                                      error:(NSError **)error;

/// Get OpenSMILE version string
- (NSString *)getVersion;

@end

NS_ASSUME_NONNULL_END
