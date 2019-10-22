<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWorkflowSubmissionFilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('workflow_submission_files', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('workflow_submission_id')->unsigned()->index();
			$table->string('name')->default('');
            $table->string('ext',5)->default('');
            $table->string('mime_type')->default('');
            $table->timestamps();
            $table->foreign('workflow_submission_id')->references('id')->on('workflow_submissions')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('workflow_submission_files');
    }
}
