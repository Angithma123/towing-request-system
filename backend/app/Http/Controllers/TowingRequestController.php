<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TowingRequest;

class TowingRequestController extends Controller
{
    /**
     * List all towing requests
     */
    public function index()
    {
        return response()->json(TowingRequest::all());
    }

    /**
     * Store a new towing request
     */
    public function store(Request $request)
    {
        $request->validate([
            'customer_name' => 'required|string|max:255',
            'location'      => 'required|string|max:255',
            'note'          => 'nullable|string',
        ]);

        $towingRequest = TowingRequest::create($request->all());

        return response()->json([
            'message' => 'Towing request created successfully',
            'data'    => $towingRequest
        ], 201);
    }

    /**
     * Accept a towing request (mark as assigned)
     */
    public function accept($id)
    {
        $request = TowingRequest::find($id);

        if (!$request) {
            return response()->json(['message' => 'Request not found'], 404);
        }

        if ($request->status === 'assigned') {
            return response()->json(['message' => 'Request already assigned'], 400);
        }

        // Mark request as accepted
        $request->status = 'assigned';
        $request->save();

        return response()->json([
            'message' => 'Request accepted successfully',
            'data'    => $request
        ]);
    }
}