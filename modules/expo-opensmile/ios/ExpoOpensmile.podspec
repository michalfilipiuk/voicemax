Pod::Spec.new do |s|
  s.name           = 'ExpoOpensmile'
  s.version        = '2.0.0'
  s.summary        = 'Clinical-grade voice analysis using real openSMILE library'
  s.description    = 'Expo native module for extracting 88 acoustic features from voice recordings using the openSMILE library with eGeMAPSv02 configuration.'
  s.author         = 'VoiceMax'
  s.homepage       = 'https://github.com/voicemax/expo-opensmile'
  s.platforms      = { :ios => '15.1' }
  s.source         = { :git => '' }
  s.static_framework = true

  s.dependency 'ExpoModulesCore'

  # Source files - Swift module and Objective-C++ bridge
  s.source_files = '*.{h,m,mm,swift}'

  # OpenSMILE static libraries
  s.vendored_libraries = 'lib/libopensmile.a', 'lib/libSMILEapi.a', 'lib/libnewmat.a'

  # Headers
  s.preserve_paths = 'include/**/*', 'config/**/*', 'lib/**/*'

  # Build settings
  s.pod_target_xcconfig = {
    'HEADER_SEARCH_PATHS' => '"${PODS_TARGET_SRCROOT}/include" "${PODS_TARGET_SRCROOT}/opensmile-src/src/include" "${PODS_TARGET_SRCROOT}/opensmile-src/progsrc/include"',
    'LIBRARY_SEARCH_PATHS' => '"${PODS_TARGET_SRCROOT}/lib"',
    'CLANG_CXX_LANGUAGE_STANDARD' => 'c++17',
    'CLANG_CXX_LIBRARY' => 'libc++',
    'GCC_PREPROCESSOR_DEFINITIONS' => '$(inherited) __IOS__=1 __STATIC_LINK=1',
    'OTHER_LDFLAGS' => '-lc++ -lz -ObjC',
    'DEAD_CODE_STRIPPING' => 'NO',
  }

  # iOS frameworks
  s.frameworks = 'Accelerate', 'AVFoundation', 'AudioToolbox', 'CoreFoundation'

  # Bundle config files - use resources (not resource_bundles) to preserve directory structure
  s.resources = ['config']

  s.swift_version = '5.0'
end
