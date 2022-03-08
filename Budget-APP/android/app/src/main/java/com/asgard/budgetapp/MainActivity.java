package com.asgard.budgetapp;

import com.facebook.react.ReactActivity;
import com.reactnativenavigation.controllers.SplashActivity;
import android.graphics.drawable.Drawable;
import android.support.v4.content.ContextCompat;
import android.view.Window;
import android.view.WindowManager;
import android.widget.LinearLayout;
import android.view.View;

public class MainActivity extends SplashActivity  {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
//    @Override
//    protected String getMainComponentName() {
//        return "surveyapp";
//    }

    @Override
    public View createSplashLayout() {
//        LinearLayout splash = new LinearLayout(this);
//        Drawable launch_screen_bitmap = ContextCompat.getDrawable(getApplicationContext(),R.drawable.ic_launcher);
//        splash.setBackground(launch_screen_bitmap);
        requestWindowFeature(Window.FEATURE_NO_TITLE);
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN,WindowManager.LayoutParams.FLAG_FULLSCREEN);
        View view = getLayoutInflater().inflate(R.layout.launch_screen, null);
        return view;
    }
}
