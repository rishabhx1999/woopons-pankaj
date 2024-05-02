<?php

namespace App\Observers;

use App\Models\Business;
use App\Models\UserPass;
use App\Mail\AccountActivate;
use App\Mail\AccountRejected;

class BusinessObserver
{
    /**
     * Handle the Business "created" event.
     *
     * @param  \App\Models\Business  $business
     * @return void
     */
    public function created(Business $business)
    {
        //
    }

    /**
     * Handle the Business "updated" event.
     *
     * @param  \App\Models\Business  $business
     * @return void
     */
    public function updated(Business $business)
    {
        //
    }

    /**
     * Handle the Business "updating" event.
     *
     * @param  \App\Models\Business  $business
     * @return void
     */
    public function updating(Business $business)
    {
        
        if($business->isDirty('status')){
            // email has changed
            $new_status = $business->status; 
            $old_status = $business->getOriginal('status');

            if ($new_status == 1) {
                \Mail::to($business->user->email)->send(new AccountActivate($business->user));
            }
            if ($new_status == 0) {
                \Mail::to($business->user->email)->send(new AccountRejected($business->user,$business));
            }
            UserPass::find($business->user->userPass->id)->delete();
        }

        
    }

    /**
     * Handle the Business "deleted" event.
     *
     * @param  \App\Models\Business  $business
     * @return void
     */
    public function deleted(Business $business)
    {
        //
    }

    /**
     * Handle the Business "restored" event.
     *
     * @param  \App\Models\Business  $business
     * @return void
     */
    public function restored(Business $business)
    {
        //
    }

    /**
     * Handle the Business "force deleted" event.
     *
     * @param  \App\Models\Business  $business
     * @return void
     */
    public function forceDeleted(Business $business)
    {
        //
    }
}
