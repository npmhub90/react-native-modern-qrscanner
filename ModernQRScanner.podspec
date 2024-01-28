Pod::Spec.new do |s|
  s.name        = "ModernQRScanner"
  s.version     = "1.0.0"
  s.summary     = "some interesting summary."
  s.description = "some interesting summary. 123123"
  s.license     = { :type => "MIT", :file => "LICENSE" }
  s.homepage    = "https://github.com/npmhub90/react-native-direction-control#readme"
  s.source      = { :git => "https://github.com/npmhub90/react-native-direction-control.git", :tag => "#{s.version}" }
  s.author      = "Igor"
  s.platform    = :ios, "9.0"
  s.source_files    = "ios/ModernQRScanner/", "ios/ModernQRScanner/*.{h,m}"
  s.frameworks       = ["UIKit", "AVFoundation", "CoreImage"]
  s.dependency 'React'
end
