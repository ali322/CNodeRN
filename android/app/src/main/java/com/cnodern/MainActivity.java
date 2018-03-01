package com.cnodern;

import android.os.Bundle;
import com.facebook.react.ReactActivity;
import org.reactnative.camera.RNCameraPackage;
import com.microsoft.codepush.react.CodePush;
import com.react.rnspinkit.RNSpinkitPackage;
import com.cboy.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {
	@Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // here
        super.onCreate(savedInstanceState);
    }
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "CNodeRN";
    }
}
